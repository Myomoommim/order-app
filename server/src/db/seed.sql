INSERT INTO menus (id, name, description, price, image_url, stock)
VALUES
  ('americano-ice', '아메리카노 (ICE)', '시원하고 깔끔한 아이스 아메리카노', 4000, '/menu/americano-ice.jpg', 10),
  ('americano-hot', '아메리카노 (HOT)', '진한 에스프레소의 깊은 맛', 4000, '/menu/americano-hot.jpg', 10),
  ('cafe-latte', '카페라떼', '부드러운 우유와 에스프레소의 조화', 4500, '/menu/cafe-latte.jpg', 10),
  ('cappuccino', '카푸치노', '풍부한 우유 거품이 올라간 커피', 4500, '/menu/cappuccino.jpg', 10),
  ('vanilla-latte', '바닐라 라떼', '달콤한 바닐라 시럽이 들어간 라떼', 5000, '/menu/vanilla-latte.jpg', 10)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

INSERT INTO options (id, menu_id, name, price)
VALUES
  ('americano-ice:extra-shot', 'americano-ice', '샷 추가', 500),
  ('americano-ice:syrup', 'americano-ice', '시럽 추가', 0),
  ('americano-hot:extra-shot', 'americano-hot', '샷 추가', 500),
  ('americano-hot:syrup', 'americano-hot', '시럽 추가', 0),
  ('cafe-latte:extra-shot', 'cafe-latte', '샷 추가', 500),
  ('cafe-latte:syrup', 'cafe-latte', '시럽 추가', 0),
  ('cappuccino:extra-shot', 'cappuccino', '샷 추가', 500),
  ('cappuccino:syrup', 'cappuccino', '시럽 추가', 0),
  ('vanilla-latte:extra-shot', 'vanilla-latte', '샷 추가', 500)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price;
