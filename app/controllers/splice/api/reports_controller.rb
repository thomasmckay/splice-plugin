module Splice
  module Api
    class ReportsController < ::Api::V2::BaseController
      def index
        @splices = Splice::Report.search_for(*search_options).paginate(paginate_options)
      end
    end
  end
end
