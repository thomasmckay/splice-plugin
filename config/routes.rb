Rails.application.routes.draw do

  namespace 'splice' do
    match 'plugin' => 'splice#plugin', :via => :get

    namespace 'api' do
      match 'reports' => 'reports#index', :via => :get
    end
  end

end
