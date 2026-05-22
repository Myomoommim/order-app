DELETE FROM order_item_options;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM options;
DELETE FROM menus;

INSERT INTO menus (id, name, description, price, image_url, stock)
VALUES
  ('pistol-glock-17', '글록 17', '9mm 권총, 경량 폴리머 프레임, 높은 신뢰성', 950000, '/menu/pistol-glock-17.png', 10),
  ('pistol-colt-m1911', '콜트 M1911', '.45 ACP 클래식 권총, 강력한 정지력', 1480000, '/menu/pistol-colt-m1911.png', 10),
  ('pistol-beretta-m92fs', '베레타 M92FS', '9mm 풀사이즈 권총, 오픈 슬라이드 구조', 1150000, '/menu/pistol-beretta-m92fs.png', 8),
  ('pistol-sig-p320', '시그 자우어 P320', '모듈러 9mm 권총, 그립 교체 가능', 980000, '/menu/pistol-sig-p320.png', 10),
  ('pistol-sw-m10', '스미스 앤 웨슨 M10', '.38 스페셜 리볼버, 컴팩트 셀프디펜스용', 650000, '/menu/pistol-sw-m10.png', 12),
  ('mg-m2-browning', 'M2 브라우닝', '12.7x99mm 중기관총, 차량·거점 방어용', 18000000, '/menu/mg-m2-browning.png', 2),
  ('mg-m60', 'M60', '7.62x51mm 범용 기관총, 휴대 부대 화력 지원', 9500000, '/menu/mg-m60.png', 3),
  ('mg-m249', 'M249', '5.56x45mm 경기관총, 분대 화력 지원', 7200000, '/menu/mg-m249.png', 4),
  ('mg-mg3', 'MG3', '7.62x51mm 범용 기관총, 높은 연사 속도', 8800000, '/menu/mg-mg3.png', 3),
  ('mg-k15', 'K15', '5.56x45mm 국산 경기관총, 경량화 설계', 6500000, '/menu/mg-k15.png', 5),
  ('rifle-ak47', 'AK-47', '7.62x39mm 가스작동식 소총, 높은 내구성', 1600000, '/menu/rifle-ak47.png', 6),
  ('rifle-m16', 'M16', '5.56x45mm 가스 작동식 소총, 정밀 사격', 2800000, '/menu/rifle-m16.png', 5),
  ('rifle-m4', 'M4', '5.56x45mm 카빈, CQB 및 다목적 운용', 2450000, '/menu/rifle-m4.png', 7),
  ('rifle-hk416', 'HK416', '5.56x45mm 프리미엄 소총, 가스 피스톤 방식', 3200000, '/menu/rifle-hk416.png', 4),
  ('rifle-m7', 'M7', '6.8x51mm 차세대 소총, 장거리 성능 강화', 3500000, '/menu/rifle-m7.png', 3),
  ('ammo-9x19-parabellum', '9x19mm 파라블럼', '9mm 권총/기관단총용 탄약 (50발 박스)', 55000, '/menu/ammo-9x19-parabellum.png', 100),
  ('ammo-45-acp', '45 ACP', '.45 권총용 탄약 (50발 박스)', 65000, '/menu/ammo-45-acp.png', 80),
  ('ammo-38-special', '.38 스페셜', '.38 리볼버용 탄약 (50발 박스)', 52000, '/menu/ammo-38-special.png', 90),
  ('ammo-762x39-m43', '7.62x39mm M43', 'AK 계열 소총용 탄약 (50발 박스)', 48000, '/menu/ammo-762x39-m43.png', 120),
  ('ammo-556-nato', '5.56x45mm NATO', '5.56mm 소총용 탄약 (50발 박스)', 58000, '/menu/ammo-556-nato.png', 100),
  ('ammo-68-common', '6.8x51mm Common', '6.8mm 소총용 탄약 (50발 박스)', 85000, '/menu/ammo-68-common.png', 60),
  ('ammo-127x99-nato', '12.7x99mm NATO', '12.7mm 중기관총용 탄약 (20발 박스)', 180000, '/menu/ammo-127x99-nato.png', 40),
  ('ammo-762x51-nato', '7.62x51mm NATO', '7.62mm 기관총·저격용 탄약 (50발 박스)', 72000, '/menu/ammo-762x51-nato.png', 80);

INSERT INTO options (id, menu_id, name, price)
VALUES
  ('pistol-glock-17:extra-mag', 'pistol-glock-17', '추가 탄창', 80000),
  ('pistol-glock-17:case', 'pistol-glock-17', '하드 케이스', 50000),
  ('pistol-colt-m1911:extra-mag', 'pistol-colt-m1911', '추가 탄창', 90000),
  ('pistol-colt-m1911:case', 'pistol-colt-m1911', '하드 케이스', 55000),
  ('pistol-beretta-m92fs:extra-mag', 'pistol-beretta-m92fs', '추가 탄창', 85000),
  ('pistol-beretta-m92fs:case', 'pistol-beretta-m92fs', '하드 케이스', 50000),
  ('pistol-sig-p320:extra-mag', 'pistol-sig-p320', '추가 탄창', 80000),
  ('pistol-sig-p320:case', 'pistol-sig-p320', '하드 케이스', 50000),
  ('pistol-sw-m10:speedloader', 'pistol-sw-m10', '스피드로더', 45000),
  ('pistol-sw-m10:case', 'pistol-sw-m10', '하드 케이스', 45000),
  ('mg-m2-browning:tripod', 'mg-m2-browning', '삼각대', 450000),
  ('mg-m2-browning:ammo-box', 'mg-m2-browning', '탄띠 박스', 350000),
  ('mg-m60:spare-barrel', 'mg-m60', '예비 총열', 280000),
  ('mg-m60:ammo-box', 'mg-m60', '탄띠 박스', 220000),
  ('mg-m249:spare-barrel', 'mg-m249', '예비 총열', 250000),
  ('mg-m249:ammo-box', 'mg-m249', '탄띠 박스', 180000),
  ('mg-mg3:spare-barrel', 'mg-mg3', '예비 총열', 270000),
  ('mg-mg3:ammo-box', 'mg-mg3', '탄띠 박스', 210000),
  ('mg-k15:spare-barrel', 'mg-k15', '예비 총열', 230000),
  ('mg-k15:ammo-box', 'mg-k15', '탄띠 박스', 170000),
  ('rifle-ak47:scope', 'rifle-ak47', '조준경', 150000),
  ('rifle-ak47:extra-mag', 'rifle-ak47', '추가 탄창', 120000),
  ('rifle-m16:scope', 'rifle-m16', '조준경', 180000),
  ('rifle-m16:extra-mag', 'rifle-m16', '추가 탄창', 130000),
  ('rifle-m4:scope', 'rifle-m4', '조준경', 170000),
  ('rifle-m4:extra-mag', 'rifle-m4', '추가 탄창', 125000),
  ('rifle-hk416:scope', 'rifle-hk416', '조준경', 200000),
  ('rifle-hk416:extra-mag', 'rifle-hk416', '추가 탄창', 140000),
  ('rifle-m7:scope', 'rifle-m7', '조준경', 220000),
  ('rifle-m7:extra-mag', 'rifle-m7', '추가 탄창', 150000)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price;
