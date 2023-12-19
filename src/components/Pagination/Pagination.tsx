import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../stateManagement/hooks";
import { decrement, increment } from "../../stateManagement/reducer";

export const Pagination: FC = () => {
    const pageCount = useAppSelector(state => state.pageCount);
    const dispatch = useAppDispatch()
    return (
        <div className="paginationContainer" data-testid="paginationContainer">
            <button
                className={pageCount === 1 ? "disabledButton" : ""}
                onClick={() => dispatch(decrement())}
                disabled={pageCount === 1}
                data-testid="decrement"
            >
                {'< Prev'}
            </button>
            <span style={{padding: "0px 10px"}} data-testid="countLabel">{pageCount}</span>
            <button
                onClick={() => dispatch(increment())}
                data-testid="increment"
            >
                {'Next >'}
            </button>
        </div>
    )
}