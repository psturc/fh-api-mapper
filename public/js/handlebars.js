var Handlebars = require('handlebars'),
$ = require('jquery'),
_ = require('underscore'),
TransformationsCollection = require('./transformations.collection.js'),
availableTransformations = new TransformationsCollection(); 
availableTransformations.fetch();

Handlebars.registerHelper('escapeSingleQuotes', function(data) {
  return data.replace(/'/g, "\\'");
});
Handlebars.registerHelper('escapeDoubleQuotes', function(data) {
  return data.replace(/"/g, '\\"');
});

Handlebars.registerHelper('fa', function(icon){
  return new Handlebars.SafeString('<i class="fa ' + icon + '"></i>');
});

Handlebars.registerHelper('transformationsForField', function(field, transformations){
  if (!transformations ){
    transformations = availableTransformations.toJSON();
  }
  var relevantTransformations = _.where(transformations, {type : field.type});
  var html = ['<select class="form-control" name="transformation">'];
  html.push('<option name="none">No transformation</option>');
  _.each(relevantTransformations, function(t){
    html.push('<option name="' + t.name + '">' + t.name + '</option>');
  });
  html.push('</select>');
  return new Handlebars.SafeString(html.join('\n'));
});

Handlebars.registerPartial('headerRow', $('#tplHeaderRow').html().toString());

module.exports = Handlebars;
