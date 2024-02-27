module ApplicationHelper
  def top_bar_back_button(path: :back)
    content_for(:top_bar) do
      render TopBar::BarComponent.new(auth_descriptor: current_auth_descriptor, search: false, back_button: path)
    end
  end

  # rubocop:todo Rails/HelperInstanceVariable
  def title
    if content_for?(:page_title)
      content_for(:page_title)
    elsif @page_title.present?
      @page_title
    else
      t("#{controller_path.tr('/', '.')}.#{action_name}.page_title", default: t("global.app_name"))
    end
  end
  # rubocop:enable Rails/HelperInstanceVariable

  # Given a form returns a name for the given path
  def form_field_name(form, path)
    form.object_name + path
  end

  def slim_class(class_string)
    class_string.split(".").join(" ")
  end

  def serialize_react(object)
    case object
    when Hash
      object.transform_keys { |k|
        k.to_s.camelize(:lower)
      }.transform_values do |value|
        serialize_react(value)
      end
    when Enumerable
      object.map { |o| serialize_react(o) }
    when ActiveType::Object, Dry::Struct
      if object.respond_to?(:to_h)
        serialize_react(object.to_h)
      else
        serialize_react(object.attributes)
      end
    when Symbol
      object.to_s
    else
      object
    end
  end

  def boolean_string(b)
    b ? "Yes" : "No"
  end
end
