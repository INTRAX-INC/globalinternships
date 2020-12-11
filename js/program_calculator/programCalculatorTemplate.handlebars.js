(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['programCalculatorTemplate.html'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <option name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"container-fluid\">\r\n  <div class=\"price-calculator-selectors\">\r\n  <div class=\"row\">\r\n  <div class=\"col-md-2\"></div>\r\n    <div class=\"col-md-4\">\r\n      <div class=\"price-country-of-residence pc-selector pc-selector-active\"><div class=\"pc-backdrop\"></div>\r\n        <div class=\"pc-price-step\">1</div>\r\n        <div class=\"pc-price-title large-text\">Choose Your Country of Residence</div>\r\n        <select name=\"pc_origin\" id=\"pc_origin\" class=\"form-control\">\r\n        <option value=\"\" selected></option>\r\n";
  stack1 = ((helper = (helper = helpers.originList || (depth0 != null ? depth0.originList : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"originList","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.originList) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </select>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n      <div class=\"price-choose-destination pc-selector\"><div class=\"pc-backdrop\"></div>\r\n        <div class=\"pc-price-step\">2</div>\r\n        <div class=\"pc-price-title large-text\">Choose Your Destination</div>\r\n        <select name=\"pc_destination\" id=\"pc_destination\" class=\"form-control\"></select>\r\n      </div>\r\n   </div>\r\n\n    <div class=\"col-md-2\"></div>\r\n   </div>\r\n\n   </div>\r\n\n   <div class=\"price-result price-hidden\">\r\n\r\n  <div class=\"row\">\r\n  <div class=\"col-md-2\"></div>\r\n    <div class=\"col-md-4\">\r\n    <div class=\"starting-price\"></div>\r\n  </div>\r\n  <div class=\"col-md-4\">\r\n    <div class=\"price-included\">\r\n\r\n      <h4>What's Included*</h4>\r\n      <div class=\"whats-included-list\"></div>\r\n      <div class=\"after-whats-included-list\">*based on 2 month program duration</div>\r\n    </div>\r\n  </div>\r\n\n   <div class=\"col-md-2\"></div>\r\n   </div>\r\n\r\n</div>\r\n" +
      "<div class=\"price-result-2 price-hidden\">\n\n  <div class=\"row\">\r\n  <div class=\"col-md-2\"></div>\r\n  <div class=\"col-md-4\">\n    <div class=\"starting-price-2\"></div>\n  </div>\n  <div class=\"col-md-4\">\n    <div class=\"price-included\">\n\n      <h4>What's Included*</h4>\n      <div class=\"whats-included-list-2\"></div>\n      <div class=\"after-whats-included-list\">*based on 6 month program duration</div>\n    </div>\n  </div>\n\n   <div class=\"col-md-2\"></div>\r\n   </div>\n\n  </div>\n\n  <p class=\"pc-bottom-note\">*Please note program fees reflect estimated costs for programs based on country of residence and may vary depending on duration and service inclusions.</p>\n\n</div>\n";
},"useData":true});
})();
