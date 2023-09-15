import React, { useEffect, useState } from "react";
import { getEvents } from "../../managers/EventManager.js";
import { useNavigate } from "react-router-dom";
import "./EventList.css"


// export event list function.
// declare navigate for useNav
// create state for events
// use effect to get the data for events
// return jsx for event objects

// for tags.. import tags from tag manager. usestate..

export const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      {
              <button
                  className="btn btn-2 btn-sep icon-create create-event-button"
                  onClick={() => {
                      navigate({ pathname: "/events/new" });
                  }}
              >
                  Create a New Party Event!
              </button>
      }
          {events.map((event) => {
              return (
                  <section key={`event--${event.id}`} className="event">
                      <div className="host">WHO? Hosted By: {event.host.full_name}</div>
                      <div></div>
                      <div className="name">WHAT? Party Name: {event.name}</div>
                      <div></div>
                      <div className="date">WHEN? {event.date}</div>
                      <div></div>
                      <div className="location">WHERE? Party Location: {event.location}</div>
                      <div></div>
                      <div className="details">WHY? Party Deets: {event.details}</div>
                      <div></div>
                      <div className="tags">
                          <div></div>
                          {event.tags.map((tag) => (
                              <span className="tag" key={tag.id}>
                                  {tag.label}
                              </span>
                          ))}
                    <div></div>
                    <button>edit</button><div></div>
                          <div></div>
                    <button>delete</button>
                      </div>
                  </section>
              );
          })}
    </article>
  );
};
