import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import timm

# 모델을 로드할 딕셔너리 생성
loaded_models_dict = {}

image_num=150942117

# 이미지 파일 경로 설정
image_paths = {
   "back": f'/content/drive/MyDrive/testinput/{image_num}/{image_num}_back.jpg',
    "front": f'/content/drive/MyDrive/testinput/{image_num}/{image_num}_front.jpg',
    "keyboard": f'/content/drive/MyDrive/testinput/{image_num}/{image_num}_keyboard.jpg',
    "monitor": f'/content/drive/MyDrive/testinput/{image_num}/{image_num}_monitor.jpg',
}

# 이미지를 텐서로 변환
transform = transforms.Compose([
    transforms.Resize((512, 512)),
    transforms.ToTensor(),
])

results = {}
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 모델 로딩 및 테스트 수행
for part, image_path in image_paths.items():
    image = Image.open(image_path)
    image = transform(image)

    # 저장된 모델 로드
    model = timm.create_model('tf_efficientnet_b0', pretrained=True)
    num_features = model.classifier.in_features
    model.classifier = nn.Linear(num_features, 3)
    model.load_state_dict(torch.load(f"/content/drive/MyDrive/efficientnet_{part}_model2.pth", map_location=device))  # 올바른 모델 파일 경로로 수정
    model.to(device)
    model.eval()  # 모델을 평가 모드로 설정

    image = image.unsqueeze(0)  # 배치 차원 추가
    image = image.to(device)

    with torch.no_grad():
        outputs = model(image)
    _, predicted = torch.max(outputs, 1)
    rank_mapping = {0: 'S', 1: 'A', 2: 'B'}  # 모델 학습 시 사용한 랭크 매핑
    predicted_rank = rank_mapping[predicted.item()]
    results[part] = predicted_rank

print("각 부위별 랭크 결과:", results)