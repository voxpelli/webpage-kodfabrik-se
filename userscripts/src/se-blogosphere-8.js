/*extern ufJS, ufJSActions, ufJSParser, openUILink */
/*
To be used with the Operator extension for Firefox
Adds support for the swedish blogosphere
Based on code from the Operator extension created by Michael Kaply, IBM, http://www.kaply.com/weblog/
Modified by Pelle Wessman, Pelles kodfabrik, http://kodfabrik.se/
Created in June 2007
*/

var intressant = {
  description: "Hitta inl\u00E4gg p\u00E5 Intressant.se",
  shortDescription: "Intressant.se",
  icon: "http://intressant.se/favicon.ico",
  pkUrl: "http://intressant.se/tema/",
  pkUrl2 : "",
  scope: {
    semantic: {
      "tag" : "tag"
    }
  },
  doAction: function(semanticObject, semanticObjectType) {
    if (semanticObject.tag) {
      return this.pkUrl + encodeURIComponent(semanticObject.tag.replace(/\+/, ' ')) + this.pkUrl2;
    }
  },
  pkClone: function(){
    var newObject = new this.constructor();
    newObject.__proto__ = this;
    return newObject;
  }
};

SemanticActions.add("intressant", intressant);

var bloggtips = intressant.pkClone();
bloggtips.description = "Hitta blogg p\u00E5 Bloggtips.se";
bloggtips.shortDescription = "Bloggtips.se";
bloggtips.icon = "http://bloggtips.se/favicon.ico";
bloggtips.pkUrl = "http://bloggtips.se/kategori/";
SemanticActions.add("bloggtips", bloggtips);

var knuffSummary = intressant.pkClone();
knuffSummary.description = "Sammanfattning p\u00E5 Knuff.se";
knuffSummary.shortDescription = "Knuff.se";
knuffSummary.icon = "http://knuff.se/favicon.ico";
knuffSummary.pkUrl = "http://knuff.se/q/";
knuffSummary.pkUrl2 = "/sammanfattning";
SemanticActions.add("knuffSummary", knuffSummary);

var bloggar = intressant.pkClone();
bloggar.description = "Hitta inl\u00E4gg p\u00E5 Bloggar.se";
bloggar.shortDescription = "Bloggar.se";
bloggar.icon = "http://bloggar.se/favicon.ico";
bloggar.pkUrl = "http://bloggar.se/om/";
SemanticActions.add("bloggar", bloggar);

var namedrop = intressant.pkClone();
namedrop.description = "Hitta texter p\u00E5 Namedrop.se";
namedrop.shortDescription = "Namedrop.se";
namedrop.icon = "http://namedrop.se/favicon.ico";
namedrop.pkUrl = "http://namedrop.se/";
SemanticActions.add("namedrop", namedrop);

var google_maps_sweden = {
  description: "Hitta med Google Maps Sverige",
  shortDescription: "Google Maps Sverige",
  icon: "http://maps.google.se/favicon.ico",
  scope: {
    semantic: {
      "geo" : "geo",
      "adr" : "adr"
    }
  },
  doAction: function(semanticObject, semanticObjectType) {
    var url;
    if ((semanticObjectType == "hCard") || (semanticObjectType == "adr")) {
      var adr;
      if (semanticObjectType == "hCard") {
        adr = semanticObject.adr[0];
      } else {
        adr = semanticObject;
      }
      if (adr) {
      	return this.pkAdr(adr);
      }
    } else if (semanticObjectType == "geo") {
      if (semanticObject.latitude && semanticObject.longitude) {
        return this.pkGeo(semanticObject);
      }
    }
  },
  pkAdr: function(adr) {
    var url = "http://maps.google.se/maps?q=";
    if (adr["street-address"]) {
      url += adr["street-address"].join(", ");
      url += ", ";
    }
    if (adr["postal-code"]) {
      url += adr["postal-code"];
      url += ", ";
    }
    if (adr.region) {
      url += adr.region;
      url += ", ";
    }
    if (adr.locality) {
      url += adr.locality;
      url += ", ";
    }
    if (adr["country-name"]) {
      url += adr["country-name"];
    }
    if (url.lastIndexOf(", ") == (url.length - ", ".length)) {
      url = url.substring(0, url.lastIndexOf(", "));
    }
    return url;
  },
  pkGeo: function(semanticObject) {
  	return "http://maps.google.se/maps?ll=" + semanticObject.latitude + "," + semanticObject.longitude + "&q=" + semanticObject.latitude + "," + semanticObject.longitude;
  },
  pkClone: function(){
    var newObject = new this.constructor();
    newObject.__proto__ = this;
    return newObject;
  }
};
SemanticActions.add("google_maps_sweden", google_maps_sweden);

var eniro = google_maps_sweden.pkClone();
eniro.description = "Hitta med Eniro kartor";
eniro.shortDescription = "Eniro Kartor";
eniro.icon = "http://kartor.eniro.se/favicon.ico";
eniro.pkGeo = function(semanticObject) {
  	return "http://kartor.eniro.se/query?what=map&mapstate=4;" + semanticObject.longitude + ";" + semanticObject.latitude;
};
eniro.pkAdr = function(adr) {
    var url = "http://kartor.eniro.se/query?what=map&mop=aq&geo_area=";
    if (adr["street-address"]) {
      url += adr["street-address"].join(", ");
      url += ", ";
    }
    if (adr["postal-code"]) {
      url += adr["postal-code"];
      url += ", ";
    }
    if (adr.region) {
      url += adr.region;
      url += ", ";
    }
    if (adr.locality) {
      url += adr.locality;
      url += ", ";
    }
    if (adr["country-name"]) {
      url += adr["country-name"];
    }
    if (url.lastIndexOf(", ") == (url.length - ", ".length)) {
      url = url.substring(0, url.lastIndexOf(", "));
    }
    return url;
};
SemanticActions.add("eniro", eniro);

var hitta = google_maps_sweden.pkClone();
hitta.description = "Hitta med Hitta.se Karta";
hitta.shortDescription = "Hitta.se Karta";
hitta.icon = "http://hitta.se/favicon.ico";
hitta.pkGeo = function(semanticObject) {
  	return false;
};
hitta.pkAdr = function(adr) {
    var url = "http://hitta.se/SearchCombi.aspx?SearchType=4&var=";
    if (adr["street-address"]) {
      url += adr["street-address"].join(", ");
      url += ", ";
    }
    if (adr["postal-code"]) {
      url += adr["postal-code"];
      url += ", ";
    }
    if (adr.region) {
      url += adr.region;
      url += ", ";
    }
    if (adr.locality) {
      url += adr.locality;
      url += ", ";
    }
    if (adr["country-name"]) {
      url += adr["country-name"];
    }
    if (url.lastIndexOf(", ") == (url.length - ", ".length)) {
      url = url.substring(0, url.lastIndexOf(", "));
    }
    return url;
};
SemanticActions.add("hitta", hitta);