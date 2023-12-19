import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stateManagement/hooks";
import { updateExpandedIds } from "../../stateManagement/reducer";
import { RepoListType } from "../../types";

export const RepoListItem: FC<RepoListType> = (props) => {
    const {id, owner: {avatar_url}, full_name, description, html_url} = props;
    const expandedIds = useAppSelector(state => state.expandedIds);
    const dispatch = useAppDispatch();
    const [hideDescription, setHideDescription] = useState(true);

    useEffect(() => {
        if(expandedIds?.some(x => x === id)) {
            setHideDescription(false);
        }
    }, [])

    const toggleDetails = () => {
        dispatch(updateExpandedIds(id));
        setHideDescription(!hideDescription);
    }

    return (
        <div className="listItem" data-testid="listItem">
            <div>
                <img src={avatar_url} alt="avatar" />
            </div>
            <div>
                <span className="repoName" data-testid="repoName">{full_name}</span>
                <br/>
                <span className={`repoDescription ${hideDescription ? 'hidden' : ''}`} data-testid="repoDescription">
                    {description}
                    {" - "}
                    <a href={html_url} target="blank">{html_url}</a> 
                </span>
            </div>
            <div className="expansionIcon" onClick={toggleDetails}>
                <span>{hideDescription ? '+' : ' - '}</span>
            </div>
        </div>
    )
}