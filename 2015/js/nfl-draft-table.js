// URL beginning and end, which will be used with the key
// To give Tabletop a URL
var google_docs_one = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=';
var google_docs_two = '&output=html';

// Google Docs spreadsheet key
var spreadsheet_key = '1N-bIPX-eU2B91AGROowruafQ1NoRaZLjmflOh-bqVNs';

// Template sources and what DIVs they will appear in
var templates = [{
    "templatesource": "#datatable-template",
    "templatehtml": "#searchable-table tbody",
    "sheet": "Sheet1"
}];

// DataTables formatting options
// More options: http://datatables.net/plug-ins/sorting

// Formatted numbers: i.e. numbers with commas
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "formatted-num-pre": function(a) {
        a = (a === "-" || a === "") ? 0 : a.replace(/[^\d\-\.]/g, "");
        return parseFloat(a);
    },
    "formatted-num-asc": function(a, b) {
        return a - b;
    },
    "formatted-num-desc": function(a, b) {
        return b - a;
    }
});
// Currency
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function(a) {
        a = (a === "-") ? 0 : a.replace(/[^\d\-\.]/g, "");
        return parseFloat(a);
    },

    "currency-asc": function(a, b) {
        return a - b;
    },

    "currency-desc": function(a, b) {
        return b - a;
    }
});
// Percentages
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "percent-pre": function(a) {
        var x = (a == "-") ? 0 : a.replace(/%/, "");
        return parseFloat(x);
    },

    "percent-asc": function(a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "percent-desc": function(a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

// Load up the DataTable
function loadDataTable() {
    // Load Datatables after Tabletop is loaded
    $('#searchable-table').dataTable({
        "bAutoWidth": false,
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        },
        "iDisplayLength": 16, // number of records per page
        // "iDisplayStart": 176, // where to start on table load
        "aaSorting": [
            [1, "asc"]
        ],
        "aoColumns": [{
            "sWidth": "9%"
                // "sType": "formatted-num" 
        }, {
            "sWidth": "9%"
                // "sType": "formatted-num" 
        }, {
            "sWidth": "25%"
                // "sType": "formatted-num" 
        }, {
            "sWidth": "25%"
                // "sType": "formatted-num" 
        }, {
            "sWidth": "9%"
                // "sType": "formatted-num" 
        }, {
            "sWidth": "18%"
                // "sType": "formatted-num" 
        }],

        // Fix thead to top of page when scrolling past it
        "initComplete": function(settings, json) {
            $('#searchable-table').show();
        },

    })

    /* $('#searchable-table').dataTable({
            bJQueryUI: true,
            "sPaginationType": "full_numbers"
        }) */
        .columnFilter({
            aoColumns: [{
                    type: "select",
                    values: ['1', '2', '3', '4', '5', '6', '7']
                },
                null,
                null,
                null,
                null, {
                    type: "select",
                    values: ['49ers', 'Bears', 'Bengals', 'Bills', 'Broncos', 'Browns', 'Buccaneers', 'Cardinals', 'Chargers', 'Chiefs', 'Colts', 'Cowboys', 'Dolphins', 'Eagles', 'Falcons', 'Giants', 'Jaguars', 'Jets', 'Lions', 'Packers', 'Panthers', 'Patriots', 'Raiders', 'Rams', 'Ravens', 'Redskins', 'Saints', 'Seahawks', 'Steelers', 'Texans', 'Titans', 'Vikings']
                }
            ]
        });

    // Close loadDataTable
};

// Use Handlebars to load data from Tabletop to page
function loadToDOM(tabletop_data, tabletop) {
    // Loop through templates
    _.each(templates, function(element, num_templates) {
        // Grab HTML of template and compile with Handlebars
        var template_html = element['templatehtml'];
        var source = $(element["templatesource"] + "").html();
        var sheet = element["sheet"];
        var handlebarscompile = Handlebars.compile(source);

        // Render the templates onto page
        $(template_html).append(handlebarscompile(tabletop.sheets(sheet)));
        // Close each statement
    }, this);

    loadDataTable();
}


// Pull data from Google spreadsheet via Tabletop
function initializeTabletopObject() {
    Tabletop.init({
        key: google_docs_one + spreadsheet_key + google_docs_two,
        callback: loadToDOM,
        simpleSheet: false,
        debug: false,
    });
}

// Load Tabletop
initializeTabletopObject();