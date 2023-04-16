import { Op } from "sequelize";
import Event from "./entities/event.entity";
import Workshop from "./entities/workshop.entity";

export class EventsService {
  async getWarmupEvents() {
    return await Event.findAll();
  }

  async getEventsWithWorkshops(): Promise<
    Array<{ event: Event; workshops: Workshop[] }>
  > {
    const events = await Event.findAll();
    const eventIds = events.map((event) => event.dataValues?.id);
    const workshops = await Workshop.findAll({
      where: { eventId: { [Op.in]: eventIds } },
      order: [["id", "ASC"]],
    });
    const eventsWithWorkshops: Array<{ event: Event; workshops: Workshop[] }> =
      events.map((event) => {
        const eventWorkshops = workshops.filter(
          (workshop) => workshop.dataValues?.eventId === event.id
        );
        return {
          ...event.toJSON(),
          workshops: eventWorkshops,
        };
      });

    return eventsWithWorkshops;
  }

  async getFutureEventWithWorkshops() {
    const workshops = await Workshop.findAll({
      where: {
        start: { [Op.gte]: new Date() },
      },
      order: [["start", "DESC"]],
    });
    const eventIds = workshops.map((workshop) => workshop.dataValues?.eventId);
    const events = await Event.findAll({
      where: {
        id: { [Op.in]: eventIds },
      },
      attributes: ["id", "name", "createdAt"],
    });
    const futureEvents = events.map((event) => {
      const futureWorkshops = workshops.filter(
        (workshop) => workshop.dataValues?.eventId === event.dataValues?.id
      );

      return { ...event.dataValues, workshops: futureWorkshops };
    });

    return futureEvents;
  }
}
