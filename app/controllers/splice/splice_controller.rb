require_dependency "splice/application_controller"

module Splice
  class SpliceController < Splice::ApplicationController

    before_filter :authorize

    def rules
      {
        :index => lambda {true},
        :plugin => lambda {true}
      }
    end

    def index
      render 'bastion/layouts/application', :layout => false
    end

    def plugin
      #redirect_to :action => 'index', :anchor => '/splices'
      render 'bastion/layouts/application', :layout => false, :anchor => '/splices'
    end
  end
end
