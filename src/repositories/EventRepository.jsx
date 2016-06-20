import Event from '../models/EventModel';

export default class EventRepository {
  static all() {
    return Event.find({ }, (err, events) => {
      if (err) return null;

      return events;
    });
  }
}