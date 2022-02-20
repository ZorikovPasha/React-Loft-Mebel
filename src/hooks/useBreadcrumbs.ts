import { BreadcrumbsLinkType } from '../types';
import { useHistory } from "react-router";

const matchingPoints = [
  { link: "catalog", name: "Каталог" },
  { link: "kitchens", name: "Кухни" },
  { link: "bedroom", name: "Спальни" },
  { link: "living", name: "Гостинные" },
  { link: "hall", name: "Прихожие" },
  { link: "office", name: "Офисная мебель" },
  { link: "children", name: "Детская" },
  { link: "promo", name: "Акция" },
  { link: "cart", name: "Корзина" },
  { link: "corners", name: "Кухонные уголки" },
  { link: "modular", name: "Модульные кухни" },
  { link: "dinner", name: "Обеденная зона" },
  { link: "Countertops", name: "Столешницы" },
  { link: "panels", name: "Стеновые панели" },
  { link: "sinks", name: "Мойки, сушилки, смесители для кухни" },
  { link: "mirrors", name: "Зеркала для спальни" },
  { link: "furniture", name: "Мебель для спальни" },
  { link: "sets", name: "Спальные гарнитуры" },
  { link: "bedsideTables", name: "Тумбы прикроватные" },

  { link: "miniwalls", name: "Мини-стенки" },
  { link: "modularLiv", name: "Модульные гостиные" },
  { link: "Shelves", name: "Полки" },
  { link: "Shelving", name: "Стеллажи" },
  { link: "walls", name: "Стенки в гостинную" },

  { link: "Hangers", name: "Вешалки для одежды" },
  { link: "mirrors", name: "Зеркала в прихожую" },
  { link: "shoeRacks", name: "Обувницы" },
  { link: "cabinets", name: "Шкафы в прихожую" },

  { link: "chairs", name: "Компьютерные кресла" },
  { link: "tables", name: "Компьютерные столы" },
  { link: "officeTables", name: "Столы для офиса" },

  { link: "beds", name: "Детские кровати" },
  { link: "upholsteredKid", name: "Детская мягкая мебель" },
  { link: "dressers", name: "Детские комоды" },
  { link: "tables", name: "Детские столики" },

  { link: "new", name: "Новинки" },
  { link: "cabinets", name: "Шкафы" },
  { link: "mattresses", name: "Матрасы" },
  { link: "upholstered", name: "Мягкая мебель" },

  { link: "products", name: "Товары" },
  { link: "favorites", name: "Избранное" },
  { link: "contacts", name: "Контакты" },
  { link: "about", name: "О нас" },
  { link: "profile", name: "Личный кабинет" },
];

export const useBreadcrumbs = () => {
  const router = useHistory();
  const points = router.location.pathname.split('/');

  const buffer: Array<BreadcrumbsLinkType> = [];

  points.forEach((point, idx) => {
    // matchingPoints.find(matchingPoint => point === matchingPoint.link);
    matchingPoints.forEach(matchingPoint => {
      if (point !== matchingPoint.link) {
        return;
      }

      let routeToPoint = points.slice(0, idx + 1).join('/');

      buffer.push({ 
        name: matchingPoint.name, 
        href: idx !== points.length - 1 ? routeToPoint: '', 
        isLink: idx !== points.length - 1 ? true : false 
      });
    })
  });

  return buffer;
};
