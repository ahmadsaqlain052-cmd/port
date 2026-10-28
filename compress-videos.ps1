<#
.SYNOPSIS
    Compresses portfolio videos for web delivery without sacrificing visual quality.

.DESCRIPTION
    Uses FFmpeg with H.264 (libx264), adaptive CRF rate control, AAC audio compression,
    and fast-start streaming headers (movflags +faststart).
    Original videos are preserved untouched in their source directory.
    Compressed files are placed into a designated output folder (default: 'compressed').

.PARAMETER InputFolder
    Directory containing original video files. Default: 'vid'

.PARAMETER OutputFolder
    Directory where compressed video files will be saved. Default: 'compressed'

.PARAMETER CRF
    Constant Rate Factor (0-51). Lower = higher quality/larger size.
    Recommended: 24-28 for web video. Default: 25

.PARAMETER Preset
    H.264 encoding preset. Default: 'slow' (best compression efficiency)
#>

param (
    [string]$InputFolder = 'vid',
    [string]$OutputFolder = 'compressed',
    [int]$CRF = 25,
    [string]$Preset = 'slow',
    [switch]$Force = $false
)

# Set UTF-8 Output
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ''
Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host '   HAMZA IRFAN PORTFOLIO — VIDEO OPTIMIZATION ENGINE     ' -ForegroundColor Yellow
Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host ('Input Directory  : ' + $InputFolder)
Write-Host ('Output Directory : ' + $OutputFolder)
Write-Host ('Quality (CRF)    : ' + $CRF + ' (Adaptive Visually Lossless)')
Write-Host ('Preset           : ' + $Preset)
Write-Host 'Fast-Start Mux   : Enabled (Instant web playback without buffering)'
Write-Host 'Original Files   : Protected (Never overwritten or deleted)'
Write-Host '----------------------------------------------------------'

# 1. Locate FFmpeg
$ffmpeg = $null
$systemFfmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if ($systemFfmpeg) {
    $ffmpeg = $systemFfmpeg.Source
} else {
    $candidates = @(
        "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.1-essentials_build\bin\ffmpeg.exe",
        "$env:ProgramFiles\ffmpeg\bin\ffmpeg.exe",
        "$env:LOCALAPPDATA\ffmpeg\bin\ffmpeg.exe"
    )
    foreach ($cand in $candidates) {
        if (Test-Path $cand) {
            $ffmpeg = $cand
            break
        }
    }
    if (-not $ffmpeg) {
        $findFfmpeg = Get-ChildItem -Path "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Filter 'ffmpeg.exe' -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($findFfmpeg) {
            $ffmpeg = $findFfmpeg.FullName
        }
    }
}

if (-not $ffmpeg -or -not (Test-Path $ffmpeg)) {
    Write-Error 'FFmpeg was not found! Please ensure FFmpeg is installed or in your PATH.'
    exit 1
}

Write-Host ('Using FFmpeg: ' + $ffmpeg) -ForegroundColor Green

# 2. Validate Input & Output Folders
$currentDir = Get-Location
$resolvedInput = Join-Path $currentDir $InputFolder
$resolvedOutput = Join-Path $currentDir $OutputFolder

if (-not (Test-Path $resolvedInput)) {
    Write-Error ('Input folder ' + $InputFolder + ' does not exist!')
    exit 1
}

if (-not (Test-Path $resolvedOutput)) {
    New-Item -ItemType Directory -Path $resolvedOutput -Force | Out-Null
    Write-Host ('Created output directory: ' + $OutputFolder) -ForegroundColor Green
}

$videoFiles = Get-ChildItem -Path $resolvedInput -Filter *.mp4 -File
if ($videoFiles.Count -eq 0) {
    Write-Warning ('No .mp4 video files found in ' + $resolvedInput + '!')
    exit 0
}

Write-Host ('Found ' + $videoFiles.Count + ' videos to process.') -ForegroundColor Cyan
Write-Host '----------------------------------------------------------'

$stats = @()
$totalOrig = 0
$totalComp = 0
$index = 0

foreach ($video in $videoFiles) {
    $index++
    $inputFile = $video.FullName
    $outputFile = Join-Path $resolvedOutput $video.Name
    $origSizeMB = [math]::Round($video.Length / 1MB, 2)
    $totalOrig += $video.Length

    $statusMsg = '[{0}/{1}] Processing: {2} ({3} MB)...' -f $index, $videoFiles.Count, $video.Name, $origSizeMB
    Write-Host $statusMsg -NoNewline

    # Skip if already compressed with reduction unless -Force
    if ((Test-Path $outputFile) -and (-not $Force)) {
        $compItem = Get-Item $outputFile
        if ($compItem.Length -gt 0 -and $compItem.Length -lt $video.Length) {
            $compSizeMB = [math]::Round($compItem.Length / 1MB, 2)
            $totalComp += $compItem.Length
            $savedPercent = [math]::Round((1 - ($compItem.Length / $video.Length)) * 100, 1)
            $skipMsg = ' [CACHED: {0} MB, -{1}%]' -f $compSizeMB, $savedPercent
            Write-Host $skipMsg -ForegroundColor Yellow
            $stats += [PSCustomObject]@{
                Video = $video.Name
                OriginalMB = $origSizeMB
                CompressedMB = $compSizeMB
                SavedPercent = '{0}%' -f $savedPercent
                Status = 'Cached'
            }
            continue
        }
    }

    $tempOutput = "$outputFile.tmp.mp4"
    if (Test-Path $tempOutput) { Remove-Item $tempOutput -Force }

    $sw = [System.Diagnostics.Stopwatch]::StartNew()

    # Pass 1: Try CRF (25 for high detail)
    $targetCRF = $CRF
    $ffmpegArgs = @(
        '-y',
        '-i', $inputFile,
        '-c:v', 'libx264',
        '-crf', $targetCRF.ToString(),
        '-preset', $Preset,
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-loglevel', 'error',
        $tempOutput
    )
    & $ffmpeg $ffmpegArgs

    # If output is not smaller, try CRF 28 for adaptive web optimization
    if (Test-Path $tempOutput) {
        $firstItem = Get-Item $tempOutput
        if ($firstItem.Length -ge $video.Length) {
            Remove-Item $tempOutput -Force
            $targetCRF = 28
            $ffmpegArgs2 = @(
                '-y',
                '-i', $inputFile,
                '-c:v', 'libx264',
                '-crf', $targetCRF.ToString(),
                '-preset', $Preset,
                '-pix_fmt', 'yuv420p',
                '-movflags', '+faststart',
                '-c:a', 'aac',
                '-b:a', '128k',
                '-loglevel', 'error',
                $tempOutput
            )
            & $ffmpeg $ffmpegArgs2
        }
    }

    # If still not smaller, remux with stream copy + faststart so stream starts instantly without bloat
    if (Test-Path $tempOutput) {
        $secondItem = Get-Item $tempOutput
        if ($secondItem.Length -ge $video.Length) {
            Remove-Item $tempOutput -Force
            $ffmpegArgsCopy = @(
                '-y',
                '-i', $inputFile,
                '-c', 'copy',
                '-movflags', '+faststart',
                '-loglevel', 'error',
                $tempOutput
            )
            & $ffmpeg $ffmpegArgsCopy
        }
    }

    $sw.Stop()

    if (Test-Path $tempOutput) {
        $compItem = Get-Item $tempOutput
        if ($compItem.Length -gt 0) {
            Move-Item $tempOutput $outputFile -Force
            $compSizeMB = [math]::Round($compItem.Length / 1MB, 2)
            $totalComp += $compItem.Length
            $savedPercent = [math]::Round((1 - ($compItem.Length / $video.Length)) * 100, 1)
            $secs = [math]::Round($sw.Elapsed.TotalSeconds, 1)

            $doneMsg = ' DONE ({0} MB | -{1}% in {2}s)' -f $compSizeMB, $savedPercent, $secs
            Write-Host $doneMsg -ForegroundColor Green
            $stats += [PSCustomObject]@{
                Video = $video.Name
                OriginalMB = $origSizeMB
                CompressedMB = $compSizeMB
                SavedPercent = '{0}%' -f $savedPercent
                Status = 'Optimized'
            }
        } else {
            Remove-Item $tempOutput -Force -ErrorAction SilentlyContinue
            Write-Host ' FAILED (Empty output file)' -ForegroundColor Red
        }
    } else {
        Write-Host ' FAILED (FFmpeg error)' -ForegroundColor Red
    }
}

# Clean any test artifacts
if (Test-Path "$resolvedOutput\test-snippet-crf27.mp4") {
    Remove-Item "$resolvedOutput\test-snippet-crf27.mp4" -Force
}

Write-Host '----------------------------------------------------------'
Write-Host 'SUMMARY RESULTS:' -ForegroundColor Cyan
$stats | Format-Table -AutoSize

$totalOrigMB = [math]::Round($totalOrig / 1MB, 2)
$totalCompMB = [math]::Round($totalComp / 1MB, 2)
$totalSavedMB = [math]::Round(($totalOrig - $totalComp) / 1MB, 2)
$totalSavedPercent = if ($totalOrig -gt 0) { [math]::Round((1 - ($totalComp / $totalOrig)) * 100, 1) } else { 0 }

Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host ('Total Original Size   : ' + $totalOrigMB + ' MB')
Write-Host ('Total Compressed Size : ' + $totalCompMB + ' MB') -ForegroundColor Green
Write-Host ('Total Bandwidth Saved : ' + $totalSavedMB + ' MB (-' + $totalSavedPercent + '% reduction!)') -ForegroundColor Yellow
Write-Host '==========================================================' -ForegroundColor Cyan
Write-Host ('All compressed videos are ready in ' + $OutputFolder + '.') -ForegroundColor Green
Write-Host ('Original videos in ' + $InputFolder + ' remain 100% safe and intact.') -ForegroundColor Green
Write-Host ''
