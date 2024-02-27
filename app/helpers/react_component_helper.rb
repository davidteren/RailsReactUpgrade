module ReactComponentHelper
  def render_react_component(component_path, **options)
    react_params = options.merge(auth_descriptor: {})
    back_path = react_params.delete(:back_path)
    show_search = react_params.delete(:show_search)

    render(
      "/react_component",
      locals: {
        component_path: component_path,
        react_params:   react_params,
        back_path:      back_path,
        show_search:    show_search,
      }
    )
  end
end
