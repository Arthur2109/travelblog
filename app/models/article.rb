include PgSearch::Model

class Article < ApplicationRecord
    has_one_attached :image
    
    has_rich_text :contenu

    pg_search_scope :search_by_title,
    against: [:title],
    using: {
      tsearch: { prefix: true }
    }
end
