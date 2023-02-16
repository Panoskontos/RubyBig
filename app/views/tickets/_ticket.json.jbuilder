json.extract! ticket, :id, :code, :event_id, :fname, :lname, :email, :seat, :status, :created_at, :updated_at
json.url ticket_url(ticket, format: :json)
