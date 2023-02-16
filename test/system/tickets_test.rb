require "application_system_test_case"

class TicketsTest < ApplicationSystemTestCase
  setup do
    @ticket = tickets(:one)
  end

  test "visiting the index" do
    visit tickets_url
    assert_selector "h1", text: "Tickets"
  end

  test "creating a Ticket" do
    visit tickets_url
    click_on "New Ticket"

    fill_in "Code", with: @ticket.code
    fill_in "Email", with: @ticket.email
    fill_in "Event", with: @ticket.event_id
    fill_in "Fname", with: @ticket.fname
    fill_in "Lname", with: @ticket.lname
    fill_in "Seat", with: @ticket.seat
    fill_in "Status", with: @ticket.status
    click_on "Create Ticket"

    assert_text "Ticket was successfully created"
    click_on "Back"
  end

  test "updating a Ticket" do
    visit tickets_url
    click_on "Edit", match: :first

    fill_in "Code", with: @ticket.code
    fill_in "Email", with: @ticket.email
    fill_in "Event", with: @ticket.event_id
    fill_in "Fname", with: @ticket.fname
    fill_in "Lname", with: @ticket.lname
    fill_in "Seat", with: @ticket.seat
    fill_in "Status", with: @ticket.status
    click_on "Update Ticket"

    assert_text "Ticket was successfully updated"
    click_on "Back"
  end

  test "destroying a Ticket" do
    visit tickets_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Ticket was successfully destroyed"
  end
end
