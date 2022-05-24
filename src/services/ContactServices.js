import axios from "axios";

export class ContactServices {
  static serverURL = "http://localhost:9000";

  // get all group name
  static getGroup() {
    let dataURL = `${this.serverURL}/groups/`;
    return axios.get(dataURL);
  }

  // get group name
  static getGroupName(contact) {
    let groupId = contact.groupId;
    let dataURL = `${this.serverURL}/groups/${groupId}`;
    return axios.get(dataURL);
  }

  // get all contacts in contactlist page
  static getAllContacts() {
    let dataURL = `${this.serverURL}/contacts`;
    return axios.get(dataURL);
  }

  // get single contact information
  static getContact(contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.get(dataURL);
  }

  // create contact
  static createContact(contact) {
    let dataURL = `${this.serverURL}/contacts/`;
    return axios.post(dataURL, contact);
  }

  // update contact
  static updateContact(contact, contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.put(dataURL, contact);
  }

  // delete contact
  static deleteContact(contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.delete(dataURL);
  }
}
