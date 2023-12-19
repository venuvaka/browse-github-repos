import { FC, useEffect, useState } from "react";
import { fetchGitHubRepoList } from "../../services";
import { useAppDispatch, useAppSelector } from "../../stateManagement/hooks";
import { updateRepoList } from "../../stateManagement/reducer";
import { Pagination } from "../Pagination/Pagination";
import { RepoListItem } from "../RepoListItem/RepoListItem";

export const GitHubRepoContainer: FC = () => {
    const pageCount = useAppSelector(state => state.pageCount);
    const repoList = useAppSelector(state => state.repoList);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true)
        fetchGitHubRepoList(pageCount).then(data => {
            dispatch(updateRepoList(data.items))
            setIsLoading(false);
        }) 
    }, [pageCount]);

    return (
        <div>
            <h1 className="title" data-testid="title">Browse GitHub</h1>
            <Pagination />
            <div className="container">
                {isLoading && <div className="overlay" data-testid="overlay">Loading ...</div>}
                {repoList?.map((item) => <RepoListItem key={item.id} {...item} />)}
            </div>
        </div>
    )
}