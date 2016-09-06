# Acronyms
I18n.available_locales.each do |locale|
  ActiveSupport::Inflector.inflections(locale) do |inflect|
    inflect.acronym 'REST'
    inflect.acronym 'HTTP'
    inflect.acronym 'HTTPS'
    inflect.acronym 'API'
  end
end
