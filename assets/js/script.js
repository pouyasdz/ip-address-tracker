var map= L.map("map")
var marker;
class Application {
  #inputElement = document.querySelector("#ip-inp");
  #ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  #apiKey = "at_ycUZNvX1ij31vzV6NhgDR5CfEzq5H";
  #baseURL = "https://geo.ipify.org/api/v2/";

  constructor() {
    this.trackCurrentIpAddress();
  }

  trackCurrentIpAddress() {
    const url = this.#baseURL + "country,city?apiKey=" + this.#apiKey;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.renderData(res);
        this.changeMapPosition([res.location.lat, res.location.lng]);
      });
  }

  trackIpAddressByIp(event) {
    event.preventDefault();
    const ip = this.#inputElement.value;
    if(!this.#ipRegex.test(ip)) return alert("not valid ip");
    const url = this.#baseURL + "country,city?apiKey=" + this.#apiKey +"&ipAddress="+ip;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.renderData(res);
        this.changeMapPosition([res.location.lat, res.location.lng]);
      });
  }

  changeMapPosition([lat, lng]) {
    map.setView([lat, lng], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    this.changeMapMarker([lat, lng])
  }

  changeMapMarker([lat, lng]) {
    var myIcon = L.icon({
      iconUrl: "../../images/icon-location.svg",
      iconSize: [38],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });

    marker = L.marker([lat, lng], {icon:myIcon}).addTo(map);
  }

  renderData(data) {
    document.querySelector("#ip-address").innerHTML = data.ip;
    document.querySelector(
      "#location"
    ).innerHTML = `${data.location.country}, ${data.location.region} ${data.location.city}`;
    document.querySelector(
      "#time-zone"
    ).innerHTML = `UTC  ${data.location.timezone}`;
    document.querySelector("#isp").innerHTML = data.isp;
  }
}

const app = new Application();
