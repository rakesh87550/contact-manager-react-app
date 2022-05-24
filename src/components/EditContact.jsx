import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactServices } from "../services/ContactServices";
import Spinner from "./Spinner";

function EditContact() {
  let navigate = useNavigate();
  let { contactId } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactServices.getContact(contactId);
        let groupResponse = await ContactServices.getGroup();
        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
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
  }, [contactId]);

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const formSubmit = async (events) => {
    events.preventDefault();
    try {
      let response = ContactServices.updateContact(state.contact, contactId);
      if (response) {
        navigate("/contact/list", { replace: true });
      }
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message,
      });
      navigate(`/contact/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, groups, errorMessage } = state;

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
                  <h3>Edit Contact</h3>
                  <p className="fst-italic">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus alias animi ullam explicabo. Deleniti at, hic
                    vel nam exercitationem facere repellat tempora ut provident
                    distinctio blanditiis quis laborum ullam maxime?
                  </p>
                </div>
              </div>

              {/* second row */}
              <div className="row align-items-center">
                <div className="col-md-6">
                  <form onSubmit={formSubmit}>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={contact.name}
                        autoComplete="off"
                        placeholder="Name"
                        name="name"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={contact.photo}
                        autoComplete="off"
                        placeholder="Photo Url"
                        name="photo"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="number"
                        className="form-control"
                        value={contact.mobile}
                        autoComplete="off"
                        placeholder="Mobile"
                        name="mobile"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        className="form-control"
                        value={contact.email}
                        autoComplete="off"
                        placeholder="Email"
                        name="email"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={contact.company}
                        autoComplete="off"
                        placeholder="Company"
                        name="company"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={contact.title}
                        autoComplete="off"
                        placeholder="Title"
                        name="title"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="groupId"
                        className="form-control"
                        value={contact.groupId}
                        onChange={updateInput}
                        required={true}
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
                        value="Update"
                        className="btn btn-success"
                      />
                      <Link to={"/contact/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img src={contact.photo} alt="" className="contact-image" />
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

export default EditContact;
