import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../public/menu')

const USER_AGENT = 'COZY-OrderApp/1.0 (educational; local dev)'

/** Pexels — 품목·카테고리에 맞는 참고 사진 (무료 라이선스) */
const PEXELS_PHOTOS = {
  'pistol-glock-17': 16632483,
  'pistol-colt-m1911': 53335,
  'pistol-beretta-m92fs': 12677162,
  'pistol-sig-p320': 9692188,
  'pistol-sw-m10': 802899,
  'mg-m2-browning': 889709,
  'mg-m60': 6090793,
  'mg-m249': 4065158,
  'mg-mg3': 6610119,
  'mg-k15': 3847729,
  'rifle-ak47': 18326134,
  'rifle-m16': 889709,
  'rifle-m4': 6204672,
  'rifle-hk416': 2127027,
  'rifle-m7': 6090793,
  'ammo-9x19-parabellum': 6610120,
  'ammo-45-acp': 40531,
  'ammo-38-special': 1435073,
  'ammo-762x39-m43': 5990245,
  'ammo-556-nato': 6610120,
  'ammo-68-common': 40531,
  'ammo-127x99-nato': 5990245,
  'ammo-762x51-nato': 1435073,
}

function pexelsUrl(photoId) {
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=640`
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

await mkdir(outDir, { recursive: true })

for (const [id, photoId] of Object.entries(PEXELS_PHOTOS)) {
  const dest = path.join(outDir, `${id}.jpg`)
  await sleep(350)
  try {
    const res = await fetch(pexelsUrl(photoId), {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
    })
    if (!res.ok) {
      console.error(`FAIL ${id}: ${res.status}`)
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 1000) {
      console.error(`SMALL ${id}`)
      continue
    }
    await writeFile(dest, buf)
    console.log(`OK ${id} (${buf.length} bytes)`)
  } catch (err) {
    console.error(`ERR ${id}:`, err.message)
  }
}
