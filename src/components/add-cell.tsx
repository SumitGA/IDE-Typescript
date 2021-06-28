import './add-cell.css';
import { useActions } from '../hooks/use-action';

interface AddCellProps {
	nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
	const { insertCellBefore } = useActions();
	return (
		<div className="add-cell">
			<div className="add-buttons">
				<button
					className="button is-rounded is-primary is-normal"
					onClick={() => insertCellBefore(nextCellId, 'code')}
				>
					<span className="icon is-small">
						<i className="fas fa-plus" />
						Code
					</span>
				</button>
				<button
					className="button is-rounded is-primary is-normal"
					onClick={() => insertCellBefore(nextCellId, 'text')}
				>
					<span className="icon is-small">
            <i className="fas fa-plus" />
            Text
            </span>
				</button>
				<div className="divider" />
			</div>
		</div>
	);
};

export default AddCell;
