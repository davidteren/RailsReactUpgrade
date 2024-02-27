module MailerContextHelper
  # rubocop:todo Rails/HelperInstanceVariable
  def mailer_context(local_assigns = {})
    @ctx || local_assigns[:ctx]
  end
  # rubocop:enable Rails/HelperInstanceVariable
end
