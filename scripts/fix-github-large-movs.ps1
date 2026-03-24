# Removes steel-designz/src/assets/images/Commercial from git history (GitHub 100MB limit).
# Run from repo root:
#   powershell -ExecutionPolicy Bypass -File scripts/fix-github-large-movs.ps1
# Then:
#   git push --force-with-lease origin master
$ErrorActionPreference = 'Continue'
Set-Location (Resolve-Path (Join-Path $PSScriptRoot '..'))

if (-not (Test-Path '.git')) {
  Write-Error 'Run from steeledezign-firehorse repo root.'
  exit 1
}

Write-Host 'Removing Commercial/ from git history on branch master...' -ForegroundColor Cyan
$env:FILTER_BRANCH_SQUELCH_WARNING = '1'
# Only rewrite local master (avoids touching remote-tracking refs)
git filter-branch -f --index-filter "git rm -rf --cached --ignore-unmatch steel-designz/src/assets/images/Commercial" master
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (Test-Path '.git/refs/original') {
  Remove-Item -Recurse -Force '.git/refs/original'
}
git reflog expire --expire=now --all
git gc --prune=now --aggressive

$gi = 'steel-designz/src/assets/images/Commercial/.gitignore'
if (-not (Test-Path $gi)) {
  New-Item -ItemType Directory -Force -Path (Split-Path $gi) | Out-Null
  @'
# Keep local only — .mov exports exceed GitHub limits (100MB hard cap)
*.mov
'@ | Set-Content -Path $gi -Encoding utf8
}

git add $gi 2>&1 | Out-Null
$st = git diff --cached --name-only
if ($st) {
  git commit -m 'Add Commercial/.gitignore after purging large screen recordings from history' 2>&1 | Out-Null
}

Write-Host ''
Write-Host 'Done. Push with:' -ForegroundColor Green
Write-Host '  git push --force-with-lease origin master' -ForegroundColor Yellow
