function updatePostPage(res) {
    const { header, body, meta, subheader } = res;
    document.querySelector('.post-heading').innerHTML = header;
    document.querySelector('.subheading').innerHTML = subheader;
    document.querySelector('.meta').innerHTML = meta;
    document.querySelector('.post').innerHTML = article;
}

$(document).ready(function () {
    fetch('./post-data')
        .then((res) => {
            updatePostPage(res);
            console.log("finished updating post");
        })
        .catch(() => {
            console.error("Could not get post data");
        });
});