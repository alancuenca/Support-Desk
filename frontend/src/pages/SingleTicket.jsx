import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleTicket, reset } from '../features/tickets/ticketSlice'
import { useParams } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function SingleTicket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);

    const dispatch = useDispatch();

    // get ticketId from url
    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getSingleTicket(ticketId))
    }, [isError, message, ticketId]);

    if (isLoading) {
        return <Spinner />
    };

    if (isError) {
        return <h3>Something Went Wrong</h3>
    }

    return (
        <div className='ticket-page'>
            <header className="ticket-header">
                <BackButton url="/tickets" />
                <h2>
                    Ticket ID: {ticket._id}
                </h2>
            </header>
        </div>
    )
}
export default SingleTicket