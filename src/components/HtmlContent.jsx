const HtmlContent = ({ children }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: children }} className="typo" />
    );
};

export default HtmlContent;
