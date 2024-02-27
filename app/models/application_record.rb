class ApplicationRecord < ActiveRecord::Base
  include Realm::Support::Pickable

  self.abstract_class = true
end
