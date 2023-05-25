import classNames from 'classnames';
import './index.css'

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

function Slider(props: PaginationProps) {
  const { nav = null, disable, onNextPageClick, onPrevPageClick, onPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };

  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  const getMarks = () => {
    if (!nav) return;

    const marks = [];
    const current = nav?.current;
    const total = nav?.total;
    let leftDots = false;
    let rightDots = false;

    const isNear = (a: number, b: number, diff = 1): boolean => Math.abs(a - b) <= diff

    for (let i = 0; i < total; i += 1) {
      const mark = PaginationMark({ value: i, label: (i + 1).toString(), disabled: false, active: i === current, onClick: onPageClick });

      if (isNear(i, current) || i >= total - 2 || i <= 1) {
        marks.push(mark)
      } else if (total > 6) {
        if (i < current && !leftDots) {
          marks.push("...");
          leftDots = true
        }

        if (i > current && !rightDots) {
          marks.push("...");
          rightDots = true;
        }
      }
    }

    return marks
  }

  return (
    <div className='slider__wrapper'>
      <div className={classNames('slider_mark slider_arrow', {disabled: disable.left})} onClick={handlePrevPageClick}>{"<"}</div>
      <div className='slider'>
        
        {getMarks()}
       
      </div>
      <div className={classNames('slider_mark slider_arrow', {disabled: disable.right})} onClick={handleNextPageClick}>{">"}</div>
    </div>
  )
}

type PaginationMarkProps = {
  onClick: () => void;
  active: boolean;
  disabled: boolean;
  value: number;
  label: string;
};

function PaginationMark(props: PaginationMarkProps) {
  const { active, disabled, value, label, onClick } = props;

  return (
    <div key={value} className={classNames('slider_mark', { active, disabled })} onClick={() => onClick(value)}>{label}</div>
  )
}

export default Slider