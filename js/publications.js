document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.abstract-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            const content = this.getAttribute('data-content');
            
            document.getElementById('abstractModalLabel').textContent = "Abstract";
            
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `<p>${content}</p>`;
            
            const modal = new bootstrap.Modal(document.getElementById('abstractModal'));
            modal.show();
        });
    });

    document.querySelectorAll('.cite-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            // 标题固定为 "BibTeX"
            const content = this.getAttribute('data-content');
            
            // 标题固定为 "BibTeX"
            document.getElementById('citeModalLabel').textContent = "BibTeX";
            
            const citeContent = document.getElementById('citeContent');
            citeContent.innerHTML = `<p>${content}</p>`;
            
            const modal = new bootstrap.Modal(document.getElementById('citeModal'));
            modal.show();
        });
    });

    // 复制功能
    document.querySelectorAll('.btn-copy').forEach(button => {
        button.addEventListener('click', function () {
            const content = this.closest('.modal-content').querySelector('.modal-body').textContent;
            navigator.clipboard.writeText(content).then(() => {
                const modalElement = this.closest('.modal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();
            });
        });
    });
}); 