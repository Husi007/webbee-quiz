import { Op } from "sequelize";
import MenuItem from "./entities/menu-item.entity";

export class MenuItemsService {
  async getMenuItems(): Promise<MenuItem[]> {
    const rootMenuItems = await MenuItem.findAll({
      where: {
        parentId: {
          [Op.is]: null,
        },
      },
      attributes: ["id", "name", "url", "parentId", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    const menuItems = await MenuItem.findAll({
      where: {
        parentId: {
          [Op.not]: null,
        },
      },
      attributes: ["id", "name", "url", "parentId", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    const nestedMenuItems = [];

    for (const rootMenuItem of rootMenuItems) {
      const children = menuItems.filter(
        (menuItem) =>
          menuItem?.dataValues?.parentId === rootMenuItem?.dataValues?.id
      );

      nestedMenuItems.push({
        ...rootMenuItem?.toJSON(),
        children: children.map((menuItem) => menuItem?.toJSON()),
      });
    }

    return nestedMenuItems;
  }
}
