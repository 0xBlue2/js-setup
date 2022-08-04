// SPDX-License-Identifier: MIT
pragma solidity 0.4.24;
// slot 0 = _initialized, _initializing
import './Initializable.sol';
// Slot Layout:
/*
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _
_initialized/, _initilizing | 0 = _authors[2^256 - keccak256(3)]
_contractId                 | 1
_owner                      | 2 = _authors[2^256 - keccak256(3) + 2]
_authors[] length           | 3
_posts[] length             | 4
_flagCaptured               | 5
                            |
...                         |
_authors[0](address)        | keccak256(3)
_authors[1](address)        | keccak256(3) + 1
...                         |
                            |
_posts[0](string title)     | keccak256(4)
_posts[0](string content)   | keccak256(4) + 1
_posts[1](title)            | keccak256(4) + 2
_posts[1](content)          | keccak256($) + 3
...                         |
                            | 2^255 = _authors[2^255 - keccak256(3)]
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _

*/
contract TotallySecureDapp is Initializable {
    struct Post {
        string title;
        string content;
    }

    string public _contractId; // slot 1 - ?? bytes
    address public _owner; // slot 2 - 20 bytes = 0xba...c9
    address[] public _authors; // slot 3 = length of array, slot keccak256(3) = first element(address of first author)
    Post[] public _posts; // slot 4 = length of array, slot keccak256(4) = first element(title of first post)
    bool public _flagCaptured; // slot 5

    event PostPublished(address indexed author, uint256 indexed index);
    event PostEdited(address indexed author, uint256 indexed index);
    event PostRemoved(address indexed author, uint256 indexed index);
    event FlagCaptured(address indexed capturer);

    modifier onlyOwner() {
        require(msg.sender == _owner, 'Caller is not the owner');
        _;
    }

    function initialize(string memory contractId) public initializer {
        _contractId = contractId;
        _owner = msg.sender;
        _flagCaptured = false;
    }

    function addPost(string title, string content) external {
        Post memory post = Post(title, content);
        _posts.push(post);
        _authors.push(msg.sender);
        emit PostPublished(msg.sender, _posts.length - 1);
    }

    function editPost(
        uint256 index,
        string title,
        string content
    ) external {
        _authors[index] = msg.sender;
        _posts[index] = Post(title, content);
        emit PostEdited(msg.sender, index);
    }

    function removePost(uint256 index) external {
        if (int256(index) < int256(_posts.length - 1)) {
            for (uint256 i = index; i < _posts.length - 1; i++) {
                _posts[i] = _posts[i + 1];
                _authors[i] = _authors[i + 1];
            }
        }
        _posts.length--;
        _authors.length--;
        emit PostRemoved(msg.sender, index);
    }

    function nPosts() public view returns (uint256) {
        return _posts.length;
    }

    function captureFlag() external onlyOwner {
        require(address(this).balance > 0.005 ether, 'Balance too low');
        _flagCaptured = true;
        emit FlagCaptured(msg.sender);
    }

    function() external payable {
        revert('Contract does not accept payments');
    }
}
