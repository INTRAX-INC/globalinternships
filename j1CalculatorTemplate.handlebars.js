(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['j1CalculatorTemplate.html'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <option value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-pricebook=\""
    + alias4(((helper = (helper = helpers.pricebook || (depth0 != null ? depth0.pricebook : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pricebook","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "\r\n<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4\">\r\n      <div class=\"j1-selector j1-selector-active\"><div class=\"j1-backdrop\"></div>\r\n        <div class=\"j1-selector-step\">1</div>\r\n        <div class=\"j1-selector-title\">Choose your Country of Residence</div>\r\n        <div class=\"j1-selector-control\">\r\n          <select class=\"form-control\" id=\"j1-country\">\r\n            <option value=\"\"></option>\r\n";
  stack1 = ((helper = (helper = helpers.countrySource || (depth0 != null ? depth0.countrySource : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"countrySource","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.countrySource) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </select>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n      <div class=\"j1-selector j1-selector-toggle\"><div class=\"j1-backdrop\"></div>\r\n        <div class=\"j1-selector-step\">2</div>\r\n        <div class=\"j1-selector-title\">Choose your Duration</div>\r\n        <div class=\"j1-selector-control\">\r\n          <div class=\"row\">\r\n            <div class=\"col-xs-3\"><i id=\"j1-price-step-minus\" class=\"fa fa-minus-circle j1-price-step\"></i></div>\r\n            <div class=\"col-xs-6\"><div id=\"j1-current-months\" class=\"j1-current-months\">12 months</div></div>\r\n            <div class=\"col-xs-3\"><i id=\"j1-price-step-plus\" class=\"fa fa-plus-circle j1-price-step\"></i></div>\r\n            <div class=\"col-xs-12\"><div id=\"j1-add-text\"></div></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n      <div class=\"j1-selector j1-selector-toggle\"><div class=\"j1-backdrop\"></div>\r\n        <div class=\"j1-selector-step\">3</div>\r\n        <div class=\"j1-selector-title\">Starting Price *</div>\r\n        <div class=\"j1-selector-control\">\r\n          <div id=\"j1-starting-price\" class=\"j1-starting-price\"></div>\r\n          <div id=\"j1-currency\" class=\"j1-currency\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();