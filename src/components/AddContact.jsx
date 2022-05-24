import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactServices } from "../services/ContactServices";
import Spinner from "./Spinner";

function AddContact() {
  let navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      company: "",
      email: "",
      title: "",
      mobile: "",
      photo: "",
      groupId: "",
    },
    errorMessage: "",
    groups: [],
  });

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        setState({ ...state, loading: true });
        let groupResponse = await ContactServices.getGroup();
        setState({
          ...state,
          loading: false,
          groups: groupResponse.data,
        });
      } catch (error) {}
    };
    fetchGroup();
  }, []);

  const formSubmit = async (events) => {
    events.preventDefault();
    try {
      let response = ContactServices.createContact(state.contact);
      if (response) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message,
      });
      navigate("/contact/add", { replace: false });
    }
  };

  let { loading, contact, errorMessage, groups } = state;
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* start header part */}
          <section className="add-contact p-3">
            <div className="container">
              {/* first row */}
              <div className="row">
                <div className="col">
                  <h3>Create Contact</h3>
                  <p className="fst-italic">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus alias animi ullam explicabo. Deleniti at, hic
                    vel nam exercitationem facere repellat tempora ut provident
                    distinctio blanditiis quis laborum ullam maxime?
                  </p>
                </div>
              </div>

              {/* second row */}
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={formSubmit}>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        required={true}
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        autoComplete="nope"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        required={true}
                        name="photo"
                        value={contact.photo}
                        onChange={updateInput}
                        autoComplete="nope"
                        placeholder="Photo Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="number"
                        className="form-control"
                        required={true}
                        name="mobile"
                        value={contact.mobile}
                        onChange={updateInput}
                        autoComplete="nope"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        className="form-control"
                        required={true}
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        autoComplete="nope"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        required={true}
                        name="company"
                        value={contact.company}
                        onChange={updateInput}
                        autoComplete="nope"
                        placeholder="Company"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        required={true}
                        name="title"
                        value={contact.title}
                        onChange={updateInput}
                        autoComplete="nope"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="groupId"
                        className="form-control"
                        required={true}
                        value={contact.groupId}
                        onChange={updateInput}
                      >
                        <option value="">Select Group...</option>
                        {groups.length > 0 &&
                          groups.map((groups) => {
                            return (
                              <option key={groups.id} value={groups.id}>
                                {groups.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        value="Create"
                        className="btn btn-success"
                      />
                      <Link to={"/contact/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* end header part */}
        </>
      )}
    </>
  );
}

export default AddContact;
