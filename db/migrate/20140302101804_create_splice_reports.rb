class CreateSpliceReports < ActiveRecord::Migration
  def change
    create_table :splice_reports, :force => true do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
