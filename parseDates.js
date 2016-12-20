var moment = require('moment');

function createDate(invoer) {
	var datum = parseDates(invoer),
	arrayDate = ["Do MMMM YYYY", "MMMM Do YYYY", "MMMM D YYYY", "D MMMM YYYY",
				"Do MMM YYYY", "MMM Do YYYY", "MMM D YYYY", "D MMM YYYY",
				"MM DD YYYY", "DD MM YYYY", "M D YYYY", "D M YYYY",				 
				"Do MMMM YY", "MMMM Do YY", "MMMM D YY", "D MMMM YY",
				"Do MMM YY", "MMM Do YY", "MMM D YY", "D MMM YY",
				"MM DD YY", "DD MM YY", "M D YY", "D M YY", "x"
				],
	transformDate = function (datum, invoerFormaat, transFormat) {
		this.transformation = moment(datum, invoerFormaat, true).format(transFormat);
	},
	unixToNatural = new transformDate(datum, "x", "MMMM Do, YYYY"),
	naturalToUnix = new transformDate(datum, arrayDate, "x"),
	naturalToNatural = new transformDate(datum, arrayDate, "MMMM Do, YYYY"),
	dateObject = { "unix": naturalToUnix.transformation, "natural": naturalToNatural.transformation };
	if(moment(datum, "x", true).isValid()) {
		dateObject.natural = unixToNatural.transformation;		
	}
	return dateObject;
}

function parseDates(dateString) {
	var firstDate = kommaExtractor(dateString),
	antwoord = separatorExtractor(firstDate);
	return antwoord;
}
var kommaExtractor = function(komma) {
 	var zonderKomma = komma.search(',');
	if (zonderKomma === -1) {
		return komma;
	}	
	var part1 = komma.slice(0, zonderKomma),
	part2 = komma.slice(zonderKomma+1),
	komma = part1.concat(part2);
	return komma;
};

var separatorExtractor = function(separator) {
 	var extractor = separator.split('');
	for (var i = 0; i < extractor.length; i++) {
		if (extractor[i].search(/\w/)) {
		extractor[i] = " ";
		}
	} 
	return extractor.join('');
};

module.exports.createDates = createDate;