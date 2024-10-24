const moment = require("moment");
const AuthUser = require("../models/authUserSchema");
const jwt = require("jsonwebtoken");
const country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre & Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts & Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const user_index_get = (req, res) => {
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  // result ==> array of objects
  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      console.log(result.customersInfo);
      res.render("index", { customers: result.customersInfo, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_post = (req, res) => {
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  AuthUser.updateOne(
    { _id: decoded.id },
    { $push: { customersInfo: req.body } }
  )
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delete = (req, res) => {
  AuthUser.updateOne(
    { "customersInfo._id": req.params.id },
    { $pull: { customersInfo: { _id: req.params.id } } }
  )
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_view_get = (req, res) => {
  // result ==> object
  AuthUser.findOne({ "customersInfo._id": req.params.id })
    .then((result) => {
      const selectedCustomer = result.customersInfo.find((item) => {
        return item._id == req.params.id;
      });
      console.log(selectedCustomer);
      res.render("user/view", {
        userDetails: selectedCustomer,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  AuthUser.findOne({ "customersInfo._id": req.params.id })
    .then((result) => {
      const selectedCustomer = result.customersInfo.find((item) => {
        return item._id == req.params.id;
      });
      res.render("user/edit", {
        userDetails: selectedCustomer,
        moment: moment,
        countryList: country_list,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_put = (req, res) => {
  AuthUser.updateOne(
    { "customersInfo._id": req.params.id },
    { "customersInfo.$": req.body }
  )
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add", { countryList: country_list });
};

const user_search_post = (req, res) => {
  const searchText = req.body.searchText.trim();
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      const filteredCustomers = result.customersInfo.filter((item) => {
        return (
          item.firstName.includes(searchText) ||
          item.lastName.includes(searchText)
        );
      });
      res.render("user/search", {
        customers: filteredCustomers,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  user_index_get,
  user_edit_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_put,
  user_add_get,
  user_post,
};
