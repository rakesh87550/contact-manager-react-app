import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactServices } from "../services/ContactServices";
import Spinner from "./Spinner";

function ContactList() {
  // search contact
  const [query, setQuery] = useState({
    text: "",
  });

  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredcontacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactServices.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredcontacts: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };
    fetchData();
  }, []);

  const deleteContact = async (contactId) => {
    let response = await ContactServices.deleteContact(contactId);
    if (response) {
      setState({ ...state, loading: true });
      let response = await ContactServices.getAllContacts();
      setState({
        ...state,
        loading: false,
        contacts: response.data,
        filteredcontacts: response.data,
      });
    }
  };

  // search contact function
  const searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredcontacts: theContacts,
    });
  };

  let { loading, contacts, filteredcontacts, errorMessage } = state;

  return (
    <>
      {/* start header part */}
      <section className="contact-search p-3">
        <div className="container">
          {/* first row */}
          <div className="row">
            <div className="col">
              <h3>
                Phone Directory
                <Link to={"/contact/add"} className="btn btn-primary ms-2">
                  <i className="fa fa-plus-circle me-2" /> New
                </Link>
              </h3>
              <p className="fst-italic">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus alias animi ullam explicabo. Deleniti at, hic vel
                nam exercitationem facere repellat tempora ut provident
                distinctio blanditiis quis laborum ullam maxime?
              </p>
            </div>
          </div>

          {/* second row */}
          <div className="row">
            <div className="col-md-6">
              <form action="" className="row">
                <div className="col">
                  <div className="mb-2">
                    <input
                      type="text"
                      name="text"
                      value={query.text}
                      onChange={searchContacts}
                      className="form-control"
                      placeholder="Search Names"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-2">
                    <input
                      type="submit"
                      className="btn btn-light btn-outline-dark"
                      value="Search"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* end header part */}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* start contact list */}
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filteredcontacts.length > 0 &&
                  filteredcontacts.map((contacts) => {
                    return (
                      <div className="col-md-6" key={contacts.id}>
                        <div className="card my-2 p-2">
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <img
                                  src={contacts.photo}
                                  alt=""
                                  className="contact-image"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action my-2">
                                    Name :{" "}
                                    <span className="fw-bold">
                                      {contacts.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action my-2">
                                    Mobile :{" "}
                                    <span className="fw-bold">
                                      {contacts.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action my-2">
                                    Email :{" "}
                                    <span className="fw-bold">
                                      {contacts.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1">
                                <Link
                                  to={`/contact/view/${contacts.id}`}
                                  className="btn btn-success my-2"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/contact/edit/${contacts.id}`}
                                  className="btn btn-primary my-2"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button
                                  className="btn btn-danger my-2"
                                  onClick={() => deleteContact(contacts.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
          {/* end contact list */}
        </>
      )}
    </>
  );
}

export default ContactList;
