time_formats = {
  default:     "%F %R",
  date:        "%F",
  time:        "%H:%M",
  humane_time: "%A, %e %B %Y @ %H:%M %Z",
}

date_formats = {
  default:     "%F",
  humane_date: "%a, %d %b %Y",
}

time_formats.each do |key, format|
  DateTime::DATE_FORMATS[key] = format
  Time::DATE_FORMATS[key] = format
end

date_formats.each do |key, format|
  Date::DATE_FORMATS[key] = format
end
