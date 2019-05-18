import React from 'react';
import './css/tabs.css';

class TabControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: props.children[0].props.label
        };

        this.handleTabClicked = tab => this.setState({activeTab: tab});
    }

    render() {
        let tabs = this.props.children.map(tab => {
            let classList = tab.props.label === this.state.activeTab ? 'tab tab--active' : 'tab';
            return (<p key={tab.props.label} className={classList} 
                        onClick={() => this.handleTabClicked(tab.props.label)}>
                            {tab.props.label}
                   </p>
        )});
        let contents = this.props.children.find(tab => tab.props.label === this.state.activeTab);

        return (
            <div>
                <div className="tabList">{tabs}</div>

                {contents}
            </div>
        );
    }
}

export default TabControl;