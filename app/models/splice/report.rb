module Splice
  class Report < ActiveRecord::Base

    scoped_search :on => :name, :complete_value => :true

    def to_param
      "#{id}-#{name.parameterize}"
    end
  end
end
