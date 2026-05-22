$assetsDir = "C:\Users\dong\.cursor\projects\c-Users-dong-Desktop-order-app\assets"
$outDir = Join-Path $PSScriptRoot "..\public\menu"

$mapping = @(
  @{ id = "pistol-glock-17"; pattern = "*____17*" },
  @{ id = "pistol-colt-m1911"; pattern = "*M1911*" },
  @{ id = "pistol-beretta-m92fs"; pattern = "*M92FS*" },
  @{ id = "pistol-sig-p320"; pattern = "*P320*" },
  @{ id = "pistol-sw-m10"; pattern = "*M10*" },
  @{ id = "mg-m2-browning"; pattern = "*M2____*" },
  @{ id = "mg-m60"; pattern = "*_M60-*" },
  @{ id = "mg-m249"; pattern = "*_M249-*" },
  @{ id = "mg-mg3"; pattern = "*_MG3-*" },
  @{ id = "mg-k15"; pattern = "*_K15-*" },
  @{ id = "rifle-ak47"; pattern = "*AK-47*" },
  @{ id = "rifle-m16"; pattern = "*_M16-*" },
  @{ id = "rifle-m4"; pattern = "*_M4-*" },
  @{ id = "rifle-hk416"; pattern = "*HK416*" },
  @{ id = "rifle-m7"; pattern = "*_M7-*" },
  @{ id = "ammo-9x19-parabellum"; pattern = "*9x19mm*" },
  @{ id = "ammo-45-acp"; pattern = "*45_ACP*" },
  @{ id = "ammo-38-special"; pattern = "*.38____*" },
  @{ id = "ammo-762x39-m43"; pattern = "*7.62x39mm*" },
  @{ id = "ammo-556-nato"; pattern = "*5.56x45mm*" },
  @{ id = "ammo-68-common"; pattern = "*6.8x51mm*" },
  @{ id = "ammo-127x99-nato"; pattern = "*12.7x99mm*" },
  @{ id = "ammo-762x51-nato"; pattern = "*7.62x51mm*" }
)

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

foreach ($item in $mapping) {
  $src = Get-ChildItem -Path $assetsDir -Filter $item.pattern -File | Select-Object -First 1
  if (-not $src) {
    Write-Host "MISSING $($item.id) ($($item.pattern))"
    continue
  }
  $dest = Join-Path $outDir "$($item.id).png"
  Copy-Item -Path $src.FullName -Destination $dest -Force
  Write-Host "OK $($item.id) <- $($src.Name)"
}
