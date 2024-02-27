class ApplicationMailer < ActionMailer::Base
  include DefaultUrlLocaleConcern

  default from: "from@example.com"
  layout "mailer"
end
