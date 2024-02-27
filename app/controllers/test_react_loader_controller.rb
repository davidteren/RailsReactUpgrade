class TestReactLoaderController < ApplicationController
  layout "blank"
  def index
    @dashboard = {}

    render_react_component "dashboard/components/App", show_search: true, **@dashboard
  end
end
