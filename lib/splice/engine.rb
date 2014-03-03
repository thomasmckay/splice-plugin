module Splice
  class Engine < ::Rails::Engine
    isolate_namespace Splice

    initializer "splice.load_app_instance_data" do |app|
      app.config.paths['db/migrate'] += Splice::Engine.paths['db/migrate'].existent
    end

  end
end
